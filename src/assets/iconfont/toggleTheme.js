export function toggle() {
    const btn = document.getElementById('btn')
    if (btn) {
        btn.addEventListener('click', function (ev) {
            console.log(ev)
            document.documentElement.style.setProperty('--x', ev.clientX + 'px')
            document.documentElement.style.setProperty('--y', ev.clientY + 'px')
            if (document.startViewTransition) {
                document.startViewTransition(() => {
                    document.documentElement.classList.toggle('dark')
                })
            } else {
                document.documentElement.classList.toggle('dark')
            }
        })
    }
}
