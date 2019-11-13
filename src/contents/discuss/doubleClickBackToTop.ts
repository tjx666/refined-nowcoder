import $ from 'jquery';

export default () => {
    $(document).dblclick(function() {
        window.scrollTo(0, 0);
    });
};
