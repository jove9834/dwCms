import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/* Layout */
import Layout from '@/views/layout/Layout'

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [{
        path: '/login',
        component: () =>
            import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/authredirect',
        component: () =>
            import('@/views/login/authredirect'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import('@/views/errorPage/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () =>
            import('@/views/errorPage/401'),
        hidden: true
    },
    {
        path: '',
        component: Layout,
        redirect: 'dashboard',
        children: [{
            path: 'dashboard',
            component: () =>
                import('@/views/dashboard/index'),
            name: 'dashboard',
            meta: {
                title: '首页',
                icon: 'dashboard',
                noCache: true
            }
        }]
    },
    {
        path: '/documentation',
        component: Layout,
        redirect: '/documentation/index',
        children: [{
            path: 'index',
            component: () =>
                import('@/views/documentation/index'),
            name: 'documentation',
            meta: {
                title: '文档',
                icon: 'documentation',
                noCache: true
            }
        }]
    },
    {
        path: '/guide',
        component: Layout,
        redirect: '/guide/index',
        children: [{
            path: 'index',
            component: () =>
                import('@/views/guide/index'),
            name: 'guide',
            meta: {
                title: '引导页',
                icon: 'guide',
                noCache: true
            }
        }]
    }
]

export default new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRouterMap
})

export const asyncRouterMap = [{
        path: '/permission',
        component: Layout,
        redirect: '/permission/index',
        alwaysShow: true, // will always show the root menu
        meta: {
            title: '权限测试页',
            icon: 'lock',
            roles: ['admin', 'editor'] // you can set roles in root nav
        },
        children: [{
            path: 'page',
            component: () =>
                import('@/views/permission/page'),
            name: 'pagePermission',
            meta: {
                title: '页面权限',
                roles: ['admin'] // or you can only set roles in sub nav
            }
        }, {
            path: 'directive',
            component: () =>
                import('@/views/permission/directive'),
            name: 'directivePermission',
            meta: {
                title: '指令权限'
                // if do not set roles, means: this page does not require permission
            }
        }]
    },

    {
        path: '/icon',
        component: Layout,
        children: [{
            path: 'index',
            component: () =>
                import('@/views/svg-icons/index'),
            name: 'icons',
            meta: {
                title: '图标',
                icon: 'icon',
                noCache: true
            }
        }]
    },
    {
        path: '/admin',
        component: Layout,
        children: [{
            path: 'admin',
            component: () =>
                import('@/views/admin/index'),
            name: 'admin',
            meta: {
                title: '管理员管理',
                icon: 'people',
                //noCache: true
            }
        }]
    },

    {
        path: '/components',
        component: Layout,
        redirect: 'noredirect',
        name: 'component-demo',
        meta: {
            title: '组件',
            icon: 'component'
        },
        children: [{
                path: 'tinymce',
                component: () =>
                    import('@/views/components-demo/tinymce'),
                name: 'tinymce-demo',
                meta: {
                    title: '富文本编辑器'
                }
            },
            {
                path: 'markdown',
                component: () =>
                    import('@/views/components-demo/markdown'),
                name: 'markdown-demo',
                meta: {
                    title: 'markdown'
                }
            },
            {
                path: 'json-editor',
                component: () =>
                    import('@/views/components-demo/jsonEditor'),
                name: 'jsonEditor-demo',
                meta: {
                    title: 'JSON编辑器'
                }
            },
            {
                path: 'splitpane',
                component: () =>
                    import('@/views/components-demo/splitpane'),
                name: 'splitpane-demo',
                meta: {
                    title: 'splitPane'
                }
            },
            {
                path: 'avatar-upload',
                component: () =>
                    import('@/views/components-demo/avatarUpload'),
                name: 'avatarUpload-demo',
                meta: {
                    title: '头像上传'
                }
            },
            {
                path: 'dropzone',
                component: () =>
                    import('@/views/components-demo/dropzone'),
                name: 'dropzone-demo',
                meta: {
                    title: 'dropzone'
                }
            },
            {
                path: 'sticky',
                component: () =>
                    import('@/views/components-demo/sticky'),
                name: 'sticky-demo',
                meta: {
                    title: 'sticky'
                }
            },
            {
                path: 'count-to',
                component: () =>
                    import('@/views/components-demo/countTo'),
                name: 'countTo-demo',
                meta: {
                    title: 'countTo'
                }
            },
            {
                path: 'mixin',
                component: () =>
                    import('@/views/components-demo/mixin'),
                name: 'componentMixin-demo',
                meta: {
                    title: '小组件'
                }
            },
            {
                path: 'back-to-top',
                component: () =>
                    import('@/views/components-demo/backToTop'),
                name: 'backToTop-demo',
                meta: {
                    title: '返回顶部'
                }
            },
            {
                path: 'drag-dialog',
                component: () =>
                    import('@/views/components-demo/dragDialog'),
                name: 'dragDialog-demo',
                meta: {
                    title: '拖拽 Dialog'
                }
            },
            {
                path: 'dnd-list',
                component: () =>
                    import('@/views/components-demo/dndList'),
                name: 'dndList-demo',
                meta: {
                    title: '列表拖拽'
                }
            },
            {
                path: 'drag-kanban',
                component: () =>
                    import('@/views/components-demo/dragKanban'),
                name: 'dragKanban-demo',
                meta: {
                    title: '可拖拽看板'
                }
            }
        ]
    },

    {
        path: '/charts',
        component: Layout,
        redirect: 'noredirect',
        name: 'charts',
        meta: {
            title: '图表',
            icon: 'chart'
        },
        children: [{
                path: 'keyboard',
                component: () =>
                    import('@/views/charts/keyboard'),
                name: 'keyboardChart',
                meta: {
                    title: '键盘图表',
                    noCache: true
                }
            },
            {
                path: 'line',
                component: () =>
                    import('@/views/charts/line'),
                name: 'lineChart',
                meta: {
                    title: '折线图',
                    noCache: true
                }
            },
            {
                path: 'mixchart',
                component: () =>
                    import('@/views/charts/mixChart'),
                name: 'mixChart',
                meta: {
                    title: '混合图表',
                    noCache: true
                }
            }
        ]
    },

    {
        path: '/tab',
        component: Layout,
        children: [{
            path: 'index',
            component: () =>
                import('@/views/tab/index'),
            name: 'tab',
            meta: {
                title: 'Tab',
                icon: 'tab'
            }
        }]
    },

    {
        path: '/table',
        component: Layout,
        redirect: '/table/complex-table',
        name: 'table',
        meta: {
            title: 'Table',
            icon: 'table'
        },
        children: [{
                path: 'dynamic-table',
                component: () =>
                    import('@/views/table/dynamicTable/index'),
                name: 'dynamicTable',
                meta: {
                    title: '动态Table'
                }
            },
            {
                path: 'drag-table',
                component: () =>
                    import('@/views/table/dragTable'),
                name: 'dragTable',
                meta: {
                    title: '拖拽Table'
                }
            },
            {
                path: 'inline-edit-table',
                component: () =>
                    import('@/views/table/inlineEditTable'),
                name: 'inlineEditTable',
                meta: {
                    title: 'Table内编辑'
                }
            },
            {
                path: 'tree-table',
                component: () =>
                    import('@/views/table/treeTable/treeTable'),
                name: 'treeTableDemo',
                meta: {
                    title: '树形表格'
                }
            },
            {
                path: 'custom-tree-table',
                component: () =>
                    import('@/views/table/treeTable/customTreeTable'),
                name: 'customTreeTableDemo',
                meta: {
                    title: '自定义树表'
                }
            },
            {
                path: 'complex-table',
                component: () =>
                    import('@/views/table/complexTable'),
                name: 'complexTable',
                meta: {
                    title: '综合Table'
                }
            }
        ]
    },

    {
        path: '/example',
        component: Layout,
        redirect: '/example/list',
        name: 'example',
        meta: {
            title: '综合实例',
            icon: 'example'
        },
        children: [{
                path: 'create',
                component: () =>
                    import('@/views/example/create'),
                name: 'createArticle',
                meta: {
                    title: '创建文章',
                    icon: 'edit'
                }
            },
            {
                path: 'edit/:id(\\d+)',
                component: () =>
                    import('@/views/example/edit'),
                name: 'editArticle',
                meta: {
                    title: '编辑文章',
                    noCache: true
                },
                hidden: true
            },
            {
                path: 'list',
                component: () =>
                    import('@/views/example/list'),
                name: 'articleList',
                meta: {
                    title: '文章列表',
                    icon: 'list'
                }
            }
        ]
    },

    {
        path: '/nested',
        component: Layout,
        redirect: '/nested/menu1/menu1-1',
        name: 'nested',
        meta: {
            title: '路由嵌套',
            icon: 'nested'
        },
        children: [
            {
                path: 'menu2',
                name: 'menu2',
                component: () =>
                    import('@/views/nested/menu2'),
                meta: {
                    title: '菜单2'
                }
            },
            {
                path: 'menu1',
                component: () =>
                    import('@/views/nested/menu1/index'), // Parent router-view
                name: 'menu1',
                meta: {
                    title: '菜单1'
                },
                redirect: '/nested/menu1/menu1-1',
                children: [{
                        path: 'menu1-1',
                        component: () =>
                            import('@/views/nested/menu1/menu1-1'),
                        name: 'menu1-1',
                        meta: {
                            title: '菜单1-1'
                        }
                    },
                    {
                        path: 'menu1-2',
                        component: () =>
                            import('@/views/nested/menu1/menu1-2'),
                        name: 'menu1-2',
                        redirect: '/nested/menu1/menu1-2/menu1-2-1',
                        meta: {
                            title: '菜单1-2'
                        },
                        children: [{
                                path: 'menu1-2-1',
                                component: () =>
                                    import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                                name: 'menu1-2-1',
                                meta: {
                                    title: '菜单1-2-1'
                                }
                            },
                            {
                                path: 'menu1-2-2',
                                component: () =>
                                    import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                                name: 'menu1-2-2',
                                meta: {
                                    title: '菜单1-2-2'
                                }
                            }
                        ]
                    },
                    {
                        path: 'menu1-3',
                        component: () =>
                            import('@/views/nested/menu1/menu1-3'),
                        name: 'menu1-3',
                        meta: {
                            title: '菜单1-3'
                        }
                    }
                ]
            },
            
        ]
    },

    {
        path: '/error',
        component: Layout,
        redirect: 'noredirect',
        name: 'errorPages',
        meta: {
            title: '错误页面',
            icon: '404'
        },
        children: [{
                path: '401',
                component: () =>
                    import('@/views/errorPage/401'),
                name: 'page401',
                meta: {
                    title: 'page401',
                    noCache: true
                }
            },
            {
                path: '404',
                component: () =>
                    import('@/views/errorPage/404'),
                name: 'page404',
                meta: {
                    title: 'page404',
                    noCache: true
                }
            }
        ]
    },

    {
        path: '/error-log',
        component: Layout,
        redirect: 'noredirect',
        children: [{
            path: 'log',
            component: () =>
                import('@/views/errorLog/index'),
            name: 'errorLog',
            meta: {
                title: '错误日志',
                icon: 'bug'
            }
        }]
    },

    {
        path: '/excel',
        component: Layout,
        redirect: '/excel/export-excel',
        name: 'excel',
        meta: {
            title: 'Excel',
            icon: 'excel'
        },
        children: [{
                path: 'export-excel',
                component: () =>
                    import('@/views/excel/exportExcel'),
                name: 'exportExcel',
                meta: {
                    title: 'exportExcel'
                }
            },
            {
                path: 'export-selected-excel',
                component: () =>
                    import('@/views/excel/selectExcel'),
                name: 'selectExcel',
                meta: {
                    title: 'selectExcel'
                }
            },
            {
                path: 'upload-excel',
                component: () =>
                    import('@/views/excel/uploadExcel'),
                name: 'uploadExcel',
                meta: {
                    title: 'uploadExcel'
                }
            }
        ]
    },

    {
        path: '/zip',
        component: Layout,
        redirect: '/zip/download',
        alwaysShow: true,
        meta: {
            title: 'zip',
            icon: 'zip'
        },
        children: [{
            path: 'download',
            component: () =>
                import('@/views/zip/index'),
            name: 'exportZip',
            meta: {
                title: 'exportZip'
            }
        }]
    },

    {
        path: '/theme',
        component: Layout,
        redirect: 'noredirect',
        children: [{
            path: 'index',
            component: () =>
                import('@/views/theme/index'),
            name: 'theme',
            meta: {
                title: '换肤',
                icon: 'theme'
            }
        }]
    },

    {
        path: '/clipboard',
        component: Layout,
        redirect: 'noredirect',
        children: [{
            path: 'index',
            component: () =>
                import('@/views/clipboard/index'),
            name: 'clipboardDemo',
            meta: {
                title: 'Clipboard',
                icon: 'clipboard'
            }
        }]
    },

    {
        path: '/i18n',
        component: Layout,
        children: [{
            path: 'index',
            component: () =>
                import('@/views/i18n-demo/index'),
            name: 'i18n',
            meta: {
                title: '国际化',
                icon: 'international'
            }
        }]
    },

    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]