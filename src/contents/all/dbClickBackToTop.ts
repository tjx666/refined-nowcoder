import $ from 'jquery';

export default function dbClickBackToTop() {
    $(document).dblclick(function() {
        // 清除所有的 selection
        const selection = window.getSelection();
        selection?.removeAllRanges();

        // 返回顶部
        $('html, body').animate({ scrollTop: 0 }, 200);
    });
}
