document.addEventListener('DOMContentLoaded', function () {
    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    }

    const whatsappLink = document.getElementById('whatsappLink');

    if (isMobileDevice()) {
        whatsappLink.href = "https://wa.me/525543225189";
    } else {
        whatsappLink.href = "https://web.whatsapp.com/send?phone=525543225189";
    }
});
