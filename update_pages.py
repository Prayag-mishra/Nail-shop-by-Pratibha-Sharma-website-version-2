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
        <div class="masonry-overlay">
            <h4>Luxury Nails</h4>
        </div>
    </div>
    '''

with open('portfolio.html', 'r', encoding='utf-8') as f:
    content = f.read()

start = content.find('<div class="masonry-grid')
end = content.find('</div>\n                    </div>\n                </div>\n            </section>')

if start != -1 and end != -1:
    new_content = content[:start] + '<div class="masonry-grid" id="portfolioGrid">\n' + portfolio_html + '\n                    </div>' + content[end+6:]
    with open('portfolio.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
        print("Portfolio updated")

gallery_urls = [
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189462/Inside_the_studio_wkrmqf.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189503/Work_mode_on_1_pwpofk.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189504/Work_mode_on_2_qwrzsx.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189506/Work_mode_on_3_yxdd7f.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189454/Doing_Nail_art_ahfbof.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189445/Award_giving_1_hs3rhi.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189444/Award_giving_2_cp4vur.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189451/Award_giving_3_egyp1f.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189445/Award_giving_4_qjywlw.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189443/Academy_t6mdow.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189452/Celebrity_2_oqzkg5.webp",
    "https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189461/Celebrity_3_v8t2zc.webp"
]

gallery_html = ""
for url in gallery_urls:
    name = url.split('/')[-1].split('_')[0].capitalize()
    gallery_html += f'''
    <div class="gallery-item img-hover">
        <img src="{url}" alt="{name}" loading="lazy">
    </div>
    '''

with open('gallery.html', 'r', encoding='utf-8') as f:
    content = f.read()

start = content.find('<div class="grid gallery-grid"')
end = content.find('</div>\n                    <div class="text-center mt-5">')

if start != -1 and end != -1:
    new_content = content[:start] + '<div class="grid gallery-grid" id="galleryGrid">\n' + gallery_html + '\n                    </div>' + content[end+6:]
    with open('gallery.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
        print("Gallery updated")

with open('about.html', 'r', encoding='utf-8') as f:
    about = f.read()
about = about.replace('https://images.unsplash.com/photo-1589710892241-155e9cdab510?auto=format&fit=crop&w=800&q=80', 'https://res.cloudinary.com/dz3ixer7i/image/upload/v1776189438/About_taking_wjjjfj.webp')
with open('about.html', 'w', encoding='utf-8') as f:
    f.write(about)
    print("About updated")
