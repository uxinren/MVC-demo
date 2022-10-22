import './app4.css';
import $ from 'jquery';

const html = `
    <section id="app4">
        <div class="circle"></div>
    </section>
`;
const $elements = $(html).appendTo($('body>.page'));

const $circles = $('#app4 .circle');
$circles.on('mouseenter', () => {
    $circles.addClass('active').on('mouseout', () => {
        $circles.removeClass('active');
    });
});