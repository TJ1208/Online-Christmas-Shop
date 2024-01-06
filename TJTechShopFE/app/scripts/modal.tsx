export const ModalToggle = (cls1: string, cls2: string) => {
    var modal = document.getElementById(cls1)
    var modalBackdrop = document.getElementById(cls2)
    modal?.setAttribute('closing', "");
    modalBackdrop?.setAttribute('closing', "");
    modal?.addEventListener('animationend', () => {
        modal?.removeAttribute('closing');
        modalBackdrop?.removeAttribute('closing');
    }, { once: true })
}

export default ModalToggle;