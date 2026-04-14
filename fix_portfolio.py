import re

portfolio_links = [
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189501/Nail_27_lzryua.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189501/Nail_25_sfwipj.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189500/Nail_24_hebf5q.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189500/Nail_23_ppc3a2.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189500/Nail_22_yxplmx.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189499/Nail_20__1_s6587r.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189499/Nail_21_cesypa.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189497/Nail_19__1_rs4vrk.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189497/Nail_18__1_gt0nnj.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189496/Nail_20_aaxfvf.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189495/Nail_19_s6g7gx.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189495/Nail_16_rklezw.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189494/Nail_17__1_ktitio.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189494/Nail_18_j8pdvl.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189493/Nail_17_vaym5p.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189491/Nail_16__1_iwhely.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189490/Nail_15__1_cfhc4c.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189490/Nail_15_wvjueu.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189489/Nail_13__1_a6k1hs.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189488/Nail_14_fib1ju.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189488/Nail_14__1_huxwcw.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189487/Nail_13_ywo3mo.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189486/Nail_12__1_flaonk.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189485/Nail_11__1_v7jbth.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189485/Nail_12_tdoyns.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189484/Nail_11_zgaswm.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189483/Nail_9_w4susf.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189483/Nail_10__1_dlbdv6.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189483/Nail_10_hi5z6e.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189482/Nail_9__1_olwcoj.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189480/Nail_7__1_oyxc9v.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189480/Nail_6__1_qptjjt.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189480/Nail_8__1_xwrfp2.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189478/Nail_8_vjd1zw.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189477/Nail_7_pq4ymb.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189476/Nail_5__1_mkuxtu.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189475/Nail_6_c88rdf.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189474/Nail_5_wivxrr.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189474/Nail_4__1_hu6dsq.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189455/Extension_utoepz.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189474/3D_ck2i7l.webp"
]

portfolio_html = ""
for i, url in enumerate(portfolio_links):
    portfolio_html += f'''
                        <div class="masonry-item filter-item all">
                            <img src="{url}" alt="Nail Art {i+1}" loading="lazy">
                            <div class="masonry-overlay"><h4>Luxury Nails</h4><p>Portfolio</p></div>
                        </div>'''

import glob
for f in glob.glob('*.html'):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    content = content.replace('<li><a href="reviews.html">Reviews</a>\n                <a href="contact.html">Contact</a></li>', '<li><a href="reviews.html">Reviews</a></li>\n                    <li><a href="contact.html">Contact</a></li>')
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

with open('portfolio.html', 'r', encoding='utf-8') as f:
    content = f.read()

start = content.find('<div class="masonry-grid" id="portfolioGrid">')
end = content.find('<div class="text-center mt-5 bg-soft p-5 rounded">')

if start != -1 and end != -1:
    new_content = content[:start] + '<div class="masonry-grid" id="portfolioGrid">\n' + portfolio_html + '\n                    </div>\n\n                    ' + content[end:]
    with open('portfolio.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
        print("Portfolio fixed")
else:
    print("Could not find delimiters in portfolio")
