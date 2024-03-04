function scrollToClass(select_cat) {
    var element = document.querySelector('.' + select_cat);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function reg_seller(){
    var newPageURL = 'seller_reg.html';
    window.location.href = newPageURL;
}
function reg_buyer(){
    var newPageURL = 'sign.html';
    window.location.href = newPageURL;
}