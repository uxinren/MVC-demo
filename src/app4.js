import './app4.css';
import $ from 'jquery';

const $circles = $('#app4 .circle');

$circles.on('mouseenter', () => {
    $circles.addClass('active').on('mouseout', () => {
        $circles.removeClass('active');
    });
});