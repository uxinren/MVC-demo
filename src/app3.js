import './app3.css';
import $ from 'jquery';

const html = `
    <section id="app3">
        <div class="square"></div>
    </section>
`;
const $elements = $(html).appendTo($('body>.page'));
const active = localStorage.getItem('app3.active') === 'true';
const $square = $('#app3 .square');
$square.toggleClass('active', active);
$square.on('click', () => {
    if ($square.hasClass('active')) {
        $square.removeClass('active');
        localStorage.setItem('app3.active', 'false');
    } else {
        $square.addClass('active');
        localStorage.setItem('app3.active', 'true');
    }
});