import $ from 'jquery';
// import { onlineStorage } from 'utils/storage';
import './style.scss';

console.log(62299);
const blockPosts = () => {
    const $postLis = $('.nk-content .common-list li');
    $postLis.each(function() {
        const links = $(this).find('.discuss-main a');
        if (links.length >= 1) {
            const title = links[0]!.textContent;
            console.log(title);
        }
    });
};

// blockPosts();
