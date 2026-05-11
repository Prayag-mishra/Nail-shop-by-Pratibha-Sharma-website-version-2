import os, glob

json_ld = """
<!-- SEO JSON-LD -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "The Nail Art Shop By Pratibha Sharma",
  "image": "https://pratibhanails.com/images/logo.svg",
  "@id": "",
  "url": "https://pratibhanails.com",
  "telephone": "+917889123473",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Jaipur",
    "addressRegion": "RJ",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 26.9124,
    "longitude": 75.7873
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "10:00",
    "closes": "20:00"
  }
}
</script>
"""

for file in glob.glob('*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    if 'application/ld+json' not in content:
        content = content.replace('</head>', json_ld + '</head>')
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
