import './app2.css';
import $ from 'jquery';

const eventBus = $(window);
const m = {
    data: {
        index: parseInt(localStorage.getItem('index')) || 0,
        create() {
        },
        delete() {
        },
        update(data) {
            Object.assign(m.data, data)
            eventBus.trigger('m:updated')
            localStorage.setItem('index', m.data.index)
        },
        get() {
        }
    }
};

const view = {
    el: null,
    html: (index) => {
        return `
    <div>
        <ol class="tabBar">
            <li class="${index === 0 ? 'selected' : null}" data-index="0"><span>1</span></li>
            <li class="${index === 1 ? 'selected' : null}" data-index="1"><span>2</span></li>
        </ol>
        <ol class="tabContent">
            <li class="${index === 0 ? 'active' : null}">内容1</li>
            <li class="${index === 1 ? 'active' : null}">内容2</li>
        </ol>
    </div>
`
    },
    render(index) {//数据更新
        if (view.el.children().length !== 0) {
            view.el.empty();
        }
        $(view.html(index)).appendTo($(view.el))
    },
    //初始化
    init(container) {
        view.el = $(container);
        //先渲染
        view.render(m.data.index);//view=render(data)
        view.autoBindEvents();
        eventBus.on('m:updated', () => {
            view.render(m.data.index);
        })
    },
    //绑定事件
    events: {
        'click .tabBar li': 'x',
    },
    x(e) {
        const index = parseInt(e.currentTarget.dataset.index)
        m.data.update({index: index})
    },
    autoBindEvents() {
        for (let key in view.events) {
            const value = view[view.events[key]];
            const spaceIndex = key.indexOf(' ');
            const part1 = key.slice(0, spaceIndex);
            const part2 = key.slice(spaceIndex + 1);
            view.el.on(part1, part2, value);
        }
    }
};

export default view