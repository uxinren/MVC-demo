class Model {
    constructor(options) {
        ['data', 'update', 'create', 'delete', 'get'].forEach(key => {
            if (key in options) {
                this[key] = options[key];
            }
        })
    }

    create() {
        console && console.error && console.error("还没有实现创建方法")
    };

    delete() {
        console && console.error && console.error("还没有实现删除方法")
    };

    update() {
        console && console.error && console.error("还没有实现更新方法")
    };

    get() {
        console && console.error && console.error("还没有实现查询方法")
    };

}

export default Model