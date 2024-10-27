import { MikroORM, RequestContext } from "@mikro-orm/core";
import config from '@/configs/mikroORM.config'
import { NextRequest, NextResponse } from "next/server";

declare global {
    // eslint-disable-next-line no-var
    var __MikroORM__: MikroORM | undefined;
}

const getORM = async () => {
    if (!global.__MikroORM__) {
        global.__MikroORM__ = await MikroORM.init(config);
    }
    return global.__MikroORM__;
};

export const withORM = (handler : (req: NextRequest, res: NextResponse) => Promise<unknown>) => async (req: NextRequest, res: NextResponse) => {
    const orm = await getORM();
    return RequestContext.create(orm.em, async () => handler(req, res));
};

export const withORMWithoutRequest = async <T>(callback: () => Promise<T>): Promise<T> => {
    const orm = await getORM();
    return RequestContext.create(orm.em, () => callback());
};


export const getEM = () => {
    const em = RequestContext.getEntityManager();
    if (!em) throw new Error("Entity manager not found. Are you in a 'withORM'-wrapped Context?");
    return em;
};

export const getForkedEM = async () => {
	const orm = await getORM();
	if (!orm) throw new Error("ORM not found.");
	return orm?.em?.fork();
}
