
document.addEventListener("DOMContentLoaded", function () {
    const pageLink = location.protocol + '//' + location.host + location.pathname;
    // console.log( 'pageLink -', pageLink );

    const ig = document.querySelector('.share-links.instagram');
    if ( navigator.canShare )   {
        if ( ig )   {
            ig.addEventListener('click', async e => {
                e.preventDefault();
                const mainImage = document.querySelector('.ans-banner-img');
                if ( mainImage && mainImage.getAttribute('src') )   {
                    const URL = document.getElementById('full-page') ? document.getElementById('full-page').getAttribute('src') : mainImage.getAttribute('src');
                    const response = await fetch(URL.toString());
                    const blob = await response.blob();
                    const filesArray = [
                        new File([blob], `test.png`, {
                          type: 'image/png',
                          lastModified: new Date().getTime(),
                        }),
                      ];
                    const shareData = {
                        files: filesArray,
                    };
                    if ( navigator.canShare && navigator.canShare(shareData) ) {
                        await navigator.share(shareData);
                    } else {
                        alert(`navigator.share doesn't support in your device`);
                    }
                }
            });
        }
    } else  {
        if ( ig )   ig.classList.add('uk-hidden');
    }

    const fb = document.querySelector('.share-links.facebook');
    if ( fb )   {
        const fbShareLink = `https://www.facebook.com/sharer/sharer.php?u=${ encodeURIComponent(pageLink) }`;
        fb.setAttribute('href', fbShareLink);
        fb.addEventListener('click', e => {
            e.preventDefault();
            const fbpopup = window.open(fbShareLink, "pop", "width=600, height=400, scrollbars=no");
            return false;
        });
    }

    const wa = document.querySelector('.share-links.whatsapp');
    if ( wa )   wa.setAttribute('href', `https://api.whatsapp.com/send?text=${ encodeURIComponent(pageLink) }`);

    const copy = document.querySelector('.share-links.linkedin');
    if ( copy )   {
        copy.setAttribute('href', pageLink);
        copy.setAttribute('title', `Copy Link`);
        copy.addEventListener('click', e => {
            e.preventDefault();
            if ( navigator && navigator.clipboard && copy.getAttribute('href') )    {
                navigator.clipboard.writeText( copy.getAttribute('href') );
                UIkit.notification(`
                    <div>Link copied.</div>
                `, {
                    status: 'danger',
                    pos: 'bottom-center',
                    timeout: 2000,
                });
            }
        });
    }
});