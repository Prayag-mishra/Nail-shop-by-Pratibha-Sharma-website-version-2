import glob

for f in glob.glob('*.html'):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Update title of reviews.html if it's reviews.html
    if f == 'reviews.html':
        content = content.replace('<title>Gallery | The Nail Art Shop</title>', '<title>Reviews | The Nail Art Shop</title>')
    
    # Check if Reviews is already in header
    if 'href="reviews.html"' not in content:
        # Header nav
        content = content.replace('<a href="contact.html">Contact</a>', '<a href="reviews.html">Reviews</a>\n                <a href="contact.html">Contact</a>')
        
    # Check if Reviews is in footer
    if '<li><a href="reviews.html">Reviews</a></li>' not in content:
        content = content.replace('<li><a href="contact.html">Contact</a></li>', '<li><a href="reviews.html">Reviews</a></li>\n                    <li><a href="contact.html">Contact</a></li>')
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("Navigation updated.")
