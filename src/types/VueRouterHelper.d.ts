import VueRouter from "vue-router";
import {RawLocation, Route, RouteConfig} from "vue-router";

interface ExConfig {
    /**
     * 需要的权限键
     */
    permission?: string,

    /**
     * 使用的layout 存在children时生效
     * 填写不存在的layout会使用默认layout
     * 顶级路由除了false,不填写或填写不存在的会使用默认layout
     * 下级路由不填写将使用预设的空白layout
     */
    layout?: string | boolean,
    /**
     * 加载组件的路径 优先级高于扩展path 高于原生component
     */
    component?: string,
    /**
     * 相对上级路径加载组件的路径(优先级低于扩展component 高于原生component
     * 不填写原生path时,自动设置扩展path到原生path 驼峰会转为下划线
     * 原生与扩展path都没有时会使用name 会自动去除name开头与当前完整路径相同的部分(/会被删除,忽略大小写)
     */
    path?: string,


    /**
     * 登陆校验
     */
    loginVerify?: (args: {
        /**
         * 前往
         */
        to?: Route,
        /**
         * 来源
         */
        from?: (location: RawLocation) => void,
        /**
         * 是否正在前往登陆路由
         */
        isLoginRouter?: boolean,
        /**
         * 设置用户拥有的权限
         */
        setPermission?: (permissions: Array<string>) => void
    }) => boolean,


    /**
     * 没有权限时跳转到的路由
     * 为字符串时相当于设置扩展path
     * 不填写时使用预设的
     * <div style='height:100%;display:flex;justify-content:center;align-items:center'>
     *     <h1>无权访问<a onClick='router.go(-1)'>返回</a></h1>
     * </div>
     */
    permissionDenied?: string | PermissionDeniedConfig,

    /**
     * _开头的任意属性 复制到路由对象的meta中
     */
    _property?: any,

}

/**
 * 不设置 原生component|扩展path|扩展component 时使用预设的
 */
type PermissionDeniedConfig = VueRouterConfig & {
    _?: ExConfig & {
        /**
         * 是否设置为根节点
         */
        isRootRouter?: boolean
    }

}

type VueRouterConfig = RouteConfig & {
    _?: ExConfig
};

type Layout = {
    name: string,
    path: string
    /**
     * 设置为默认模板 只能有一个
     * @default false
     */
    default?: boolean,
}

type Options = {
    /**
     *  @default '@/views/
     */
    pathLoadDir: string,
    /**
     * @default '@/layouts/'
     */
    layoutLoadDir: string,
}

export declare class VueRouterHelper {
    constructor(args: {
        /**
         * 布局
         */
        layouts: Array<Layout>,
        routers: Array<VueRouterConfig>,
        options?: Options,
    });


    build(): RouteConfig[];

    bindEvents(router: VueRouter): void;
}