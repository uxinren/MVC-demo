import './app1.css';
import $ from "jquery";
import Model from "./base/Model";

const eventBus = $(window);

const m = new Model({
    data: {
        n: parseInt(localStorage.getItem('n')) || 100,
    },
    update: function (data) {
        Object.assign(m.data, data)
        eventBus.trigger('m:updated')
        localStorage.setItem('n', m.data.n)
    }
})
const view = {
    el: null,
    html: `
       <div>
        <div class="output">
            <span id="number">{{n}}</span>
        </div>
        <div class="actions">
            <button id="add1">+1</button>
            <button id="minus1">-1</button>
            <button id="mul1">*2</button>
            <button id="divide1">÷2</button>
        </div>
</div>`,
    //初始化
    init(container) {
        view.el = $(container);
        view.render(m.data.n);//view=render(data)
        //先渲染
        view.autoBindEvents();
        eventBus.on('m:updated', () => {
            view.render(m.data.n);
        })
    },
    render() {//数据更新
        if (view.el.children().length !== 0) {
            view.el.empty();
        }
        $(view.html.replace('{{n}}', m.data.n))
            .appendTo($(view.el));
    },
    //绑定事件
    events: {
        'click #add1': 'add',
        'click #minus1': 'minus',
        'click #mul1': 'mul',
        'click #divide1': 'divide',
    },
    add() {
        m.update({n: m.data.n + 1})
    },
    minus() {
        m.update({n: m.data.n - 1})
    },
    mul() {
        m.update({n: m.data.n * 2})
    },
    divide() {
        m.update({n: m.data.n / 2})
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
export default view;

