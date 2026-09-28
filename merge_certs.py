import os
from PIL import Image
from PyPDF2 import PdfMerger

cert_dir = r"C:\Users\lenovo\OneDrive\Desktop\adwoa-acheampong.github.io\docs\certifications"
output_pdf = r"C:\Users\lenovo\OneDrive\Desktop\adwoa-acheampong.github.io\docs\Adwoa_Acheampong_Certifications.pdf"
temp_pdfs = []

# List of files in the preferred order
files = [
    "Data-analytics-certificate-Adwoa-Acheampong.png",
    "DataCamp_SQL_Certificate_Adwoa_Acheampong.pdf",
    "cisco-data-analytics.pdf",
    "ibm-business-analyst-coursera.jpg",
    "ibm-business-analysis.png",
    "Business Management OHSC.pdf",
    "Travel_Manager_Certificate_Adwoa_Acheampon.png"
]

merger = PdfMerger()

for fname in files:
    fpath = os.path.join(cert_dir, fname)
    if not os.path.exists(fpath):
        print(f"Skipping {fname}, file not found")
        continue

    if fname.lower().endswith(".png") or fname.lower().endswith(".jpg"):
        # Convert image to PDF
        image = Image.open(fpath)
        img_pdf_path = fpath + ".pdf"
        
        # Convert RGBA to RGB if necessary
        if image.mode == 'RGBA':
            image = image.convert('RGB')
            
        image.save(img_pdf_path, "PDF", resolution=100.0)
        temp_pdfs.append(img_pdf_path)
        merger.append(img_pdf_path)
        print(f"Appended converted image: {fname}")
    elif fname.lower().endswith(".pdf"):
        merger.append(fpath)
        print(f"Appended PDF: {fname}")

merger.write(output_pdf)
merger.close()

# Cleanup temp pdfs
for temp_pdf in temp_pdfs:
    os.remove(temp_pdf)

print(f"Successfully generated {output_pdf}")
