import $ from 'jquery';
// require('jquery.easing')($);

export default () => {
    $(document).dblclick(function() {
        // 清除所有的 selection
        const selection = window.getSelection();
        if (selection) {
            selection.removeAllRanges();
        }

        // 返回顶部
        $('html, body').animate({ scrollTop: 0 }, 200);
    });
};
