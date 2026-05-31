#!/usr/bin/env python3
"""Generate Usman Milas's updated CV PDF with enhanced work experience."""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.lib import colors
from reportlab.lib.units import inch, mm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether, Image
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

# ━━ Color Palette ━━
ACCENT       = colors.HexColor('#278b38')
TEXT_PRIMARY  = colors.HexColor('#242320')
TEXT_MUTED    = colors.HexColor('#87827a')
BG_SURFACE   = colors.HexColor('#dedbd6')
BG_PAGE      = colors.HexColor('#eeece8')

# ━━ Font Registration ━━
pdfmetrics.registerFont(TTFont('LiberationSerif', '/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf'))
pdfmetrics.registerFont(TTFont('LiberationSerif-Bold', '/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf'))
pdfmetrics.registerFont(TTFont('Carlito', '/usr/share/fonts/truetype/english/Carlito-Regular.ttf'))
pdfmetrics.registerFont(TTFont('Carlito-Bold', '/usr/share/fonts/truetype/english/Carlito-Bold.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans', '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'))
registerFontFamily('LiberationSerif', normal='LiberationSerif', bold='LiberationSerif-Bold')
registerFontFamily('Carlito', normal='Carlito', bold='Carlito-Bold')
registerFontFamily('DejaVuSans', normal='DejaVuSans', bold='DejaVuSans')

# ━━ Output Path ━━
OUTPUT_DIR = "/home/z/my-project/download"
os.makedirs(OUTPUT_DIR, exist_ok=True)
OUTPUT_PDF = os.path.join(OUTPUT_DIR, "Usman_CV.pdf")

# ━━ Page Setup ━━
PAGE_W, PAGE_H = A4
LEFT_MARGIN = 0.75 * inch
RIGHT_MARGIN = 0.75 * inch
TOP_MARGIN = 0.6 * inch
BOTTOM_MARGIN = 0.6 * inch
CONTENT_W = PAGE_W - LEFT_MARGIN - RIGHT_MARGIN

# ━━ Styles ━━
name_style = ParagraphStyle(
    name='Name', fontName='Carlito', fontSize=22, leading=28,
    textColor=ACCENT, alignment=TA_CENTER, spaceAfter=2,
)

subtitle_style = ParagraphStyle(
    name='Subtitle', fontName='Carlito', fontSize=10, leading=14,
    textColor=TEXT_MUTED, alignment=TA_CENTER, spaceAfter=6,
)

section_title_style = ParagraphStyle(
    name='SectionTitle', fontName='Carlito', fontSize=13, leading=18,
    textColor=ACCENT, spaceBefore=14, spaceAfter=4,
)

body_style = ParagraphStyle(
    name='Body', fontName='LiberationSerif', fontSize=10.5, leading=16,
    textColor=TEXT_PRIMARY, alignment=TA_LEFT, spaceAfter=3,
)

body_justify_style = ParagraphStyle(
    name='BodyJustify', fontName='LiberationSerif', fontSize=10.5, leading=16,
    textColor=TEXT_PRIMARY, alignment=TA_JUSTIFY, spaceAfter=3,
)

bullet_style = ParagraphStyle(
    name='Bullet', fontName='LiberationSerif', fontSize=10.5, leading=16,
    textColor=TEXT_PRIMARY, alignment=TA_LEFT, leftIndent=18,
    bulletIndent=6, spaceAfter=2,
)

exp_title_style = ParagraphStyle(
    name='ExpTitle', fontName='Carlito', fontSize=11, leading=15,
    textColor=TEXT_PRIMARY, spaceBefore=8, spaceAfter=2,
)

exp_date_style = ParagraphStyle(
    name='ExpDate', fontName='LiberationSerif', fontSize=10, leading=14,
    textColor=ACCENT, spaceAfter=2,
)

contact_style = ParagraphStyle(
    name='Contact', fontName='LiberationSerif', fontSize=9.5, leading=13,
    textColor=TEXT_MUTED, alignment=TA_CENTER, spaceAfter=1,
)

# ━━ Helper Functions ━━
def section_heading(text):
    """Create a section heading with an underline."""
    return [
        Paragraph(f'<b>{text}</b>', section_title_style),
        HRFlowable(width="100%", thickness=1.2, color=ACCENT, spaceAfter=6),
    ]

def bullet(text):
    return Paragraph(f'<bullet>&bull;</bullet> {text}', bullet_style)


# ━━ Build Document ━━
doc = SimpleDocTemplate(
    OUTPUT_PDF,
    pagesize=A4,
    leftMargin=LEFT_MARGIN,
    rightMargin=RIGHT_MARGIN,
    topMargin=TOP_MARGIN,
    bottomMargin=BOTTOM_MARGIN,
    title="Usman Milas - CV",
    author="Usman Milas",
)

story = []

# ── Header: Name & Contact (no photo) ──
story.append(Paragraph('<b>Mohamed Usman Mohamed Milas</b>', name_style))
story.append(Paragraph('Freelance Web Designer &amp; Developer', subtitle_style))

contact_info = (
    '+94 77 919 4083 &nbsp;|&nbsp; '
    'mohamadusman200@gmail.com &nbsp;|&nbsp; '
    'Veyangoda, Gampaha, Sri Lanka'
)
story.append(Paragraph(contact_info, contact_style))
story.append(Paragraph(
    '<a href="https://portfolio-usman-milas.vercel.app/" color="#278b38">https://portfolio-usman-milas.vercel.app/</a>',
    ParagraphStyle(name='Website', fontName='LiberationSerif', fontSize=9.5, leading=13,
                   textColor=ACCENT, alignment=TA_CENTER, spaceAfter=4)
))

story.append(HRFlowable(width="100%", thickness=1.5, color=ACCENT, spaceAfter=10))

# ── Personal Information (with profile picture on right) ──
story.extend(section_heading('Personal Information'))

PROFILE_IMG = "/home/z/my-project/upload/portfolio_profile.jpg"
PHOTO_W = 110
PHOTO_H = 138

# Personal info rows (left side)
personal_data = [
    [Paragraph('<b>Full Name</b>', body_style), Paragraph('Mohamed Usman Mohamed Milas', body_style)],
    [Paragraph('<b>Preferred Name</b>', body_style), Paragraph('Usman', body_style)],
    [Paragraph('<b>Date of Birth</b>', body_style), Paragraph('10th September 2004', body_style)],
    [Paragraph('<b>Gender</b>', body_style), Paragraph('Male', body_style)],
    [Paragraph('<b>Nationality</b>', body_style), Paragraph('Sri Lankan', body_style)],
    [Paragraph('<b>Address</b>', body_style), Paragraph('45, Kahatowita, Veyangoda, Gampaha, Sri Lanka', body_style)],
]

info_col_w = CONTENT_W - PHOTO_W - 16  # leave gap for photo
personal_table = Table(personal_data, colWidths=[info_col_w * 0.28, info_col_w * 0.72])
personal_table.setStyle(TableStyle([
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('LEFTPADDING', (0, 0), (-1, -1), 0),
    ('RIGHTPADDING', (0, 0), (-1, -1), 4),
    ('TOPPADDING', (0, 0), (-1, -1), 2),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 2),
]))

# Profile photo (right side)
photo = Image(PROFILE_IMG, width=PHOTO_W, height=PHOTO_H)

# Two-column layout: info on left, photo on right
pi_layout = Table(
    [[personal_table, photo]],
    colWidths=[info_col_w, PHOTO_W + 8],
)
pi_layout.setStyle(TableStyle([
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('LEFTPADDING', (0, 0), (0, 0), 0),
    ('RIGHTPADDING', (0, 0), (0, 0), 8),
    ('LEFTPADDING', (1, 0), (1, 0), 8),
    ('RIGHTPADDING', (1, 0), (1, 0), 0),
    ('TOPPADDING', (0, 0), (-1, -1), 0),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
    ('ALIGN', (1, 0), (1, 0), 'RIGHT'),
]))
story.append(pi_layout)

# ── Summary ──
story.extend(section_heading('Summary'))
story.append(Paragraph(
    'Motivated and adaptable individual with a strong foundation in computing, creative design, '
    'and problem-solving. Skilled in programming, digital media production, and collaboration, '
    'with a passion for creating effective and user-friendly digital solutions. Dedicated to '
    'continuous learning and applying innovative ideas in both technical and creative fields. '
    'I believe continuous learning is essential in the technology industry, so I actively stay updated '
    'with modern tools, AI driven workflows, and emerging development trends to continuously '
    'improve my skills and adapt to industry changes.',
    body_justify_style
))

# ── Languages ──
story.extend(section_heading('Languages'))
story.append(bullet('Sinhala - Native'))
story.append(bullet('Tamil - Native'))
story.append(bullet('English - Intermediate'))

# ── Core Skills ──
story.extend(section_heading('Core Skills'))
story.append(bullet('Team Collaboration'))
story.append(bullet('Communication'))
story.append(bullet('Leadership'))
story.append(bullet('Coordination'))
story.append(bullet('Media &amp; Digital Design Creativity'))
story.append(bullet('Adaptability'))
story.append(bullet('Flexibility'))
story.append(bullet('Time Management'))
story.append(bullet('Critical Thinking'))
story.append(bullet('Problem Solving'))

# ── Technical Skills ──
story.extend(section_heading('Technical Skills'))

tech_data = [
    [Paragraph('<b>Programming</b>', body_style),
     Paragraph('HTML, Python, PHP, JavaScript (Visual Studio, VS Code)', body_style)],
    [Paragraph('<b>Database</b>', body_style),
     Paragraph('MySQL, XAMPP', body_style)],
    [Paragraph('<b>Software</b>', body_style),
     Paragraph('Microsoft Word, Excel, PowerPoint', body_style)],
    [Paragraph('<b>Creative Tools</b>', body_style),
     Paragraph('Photo Editing, Media Production, Digital Design', body_style)],
    [Paragraph('<b>Web Platforms</b>', body_style),
     Paragraph('WordPress, Webflow', body_style)],
]

tech_table = Table(tech_data, colWidths=[CONTENT_W * 0.22, CONTENT_W * 0.78])
tech_table.setStyle(TableStyle([
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('LEFTPADDING', (0, 0), (-1, -1), 0),
    ('RIGHTPADDING', (0, 0), (-1, -1), 4),
    ('TOPPADDING', (0, 0), (-1, -1), 2),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 2),
]))
story.append(tech_table)

# ── Professional Experience ──
story.extend(section_heading('Professional Experience'))

# Experience 1 - Updated with senior web designer details and earnings
story.append(Paragraph('<b>Assistant Web Designer &amp; Developer</b>', exp_title_style))
story.append(Paragraph('2022 - 2024 | Remote Collaboration with Senior Web Designer &amp; Developer', exp_date_style))
story.append(bullet(
    'Worked alongside a <b>senior professional web designer and developer</b> with a strong '
    'international freelance client base for <b>3 years</b>.'
))
story.append(bullet(
    'Earned <b>$2,000 - $3,000 per month</b> through consistent delivery of high-quality web '
    'design and development services to international clients.'
))
story.append(bullet(
    'Assisted in designing and developing modern, responsive websites using HTML, PHP, '
    'JavaScript, WordPress, and Webflow.'
))
story.append(bullet(
    'Collaborated on real client projects, improving UI/UX design, website structure, and '
    'performance optimization.'
))
story.append(bullet(
    'Gained hands-on experience in professional web development workflows, client '
    'communication, and project coordination.'
))

story.append(Spacer(1, 6))

# Experience 2 - Freelance
story.append(Paragraph('<b>Freelance Web Designer</b>', exp_title_style))
story.append(Paragraph('2022 - 2024 | Self-Employed', exp_date_style))
story.append(bullet(
    'Designed and developed responsive websites tailored to client requirements.'
))
story.append(bullet(
    'Applied creative digital design techniques to enhance user experience.'
))
story.append(bullet(
    'Managed full-cycle projects including planning, coding, testing, and delivery.'
))

# ── Education ──
story.extend(section_heading('Education'))
story.append(Paragraph('<b>Al Badriya Maha Vidyalaya, Kahatowita</b>', exp_title_style))
story.append(Paragraph('2010 - 2023', exp_date_style))
story.append(bullet('Successfully completed Advanced Level education.'))
story.append(bullet('Focused on Information Technology, Art, and Sinhala.'))

# ── Professional Qualifications ──
story.extend(section_heading('Professional Qualifications'))

story.append(Paragraph('<b>British Way English Academy</b>', exp_title_style))
story.append(Paragraph('2022', exp_date_style))
story.append(bullet('Successfully completed English language training.'))

story.append(Spacer(1, 4))

story.append(Paragraph('<b>ESOFT University, Colombo 04</b>', exp_title_style))
story.append(Paragraph('2025', exp_date_style))
story.append(bullet(
    'Reading: Pearson Assured (UK) RQF Level 4 - Higher National Certificate (HNC) in Computing.'
))

# ── Declaration ──
story.extend(section_heading('Declaration'))
story.append(Paragraph(
    'I hereby declare that the information provided above is true and accurate to the best of my '
    'knowledge. I understand that any misrepresentation may lead to disqualification from '
    'consideration.',
    body_justify_style
))

# ━━ Build PDF ━━
doc.build(story)
print(f"CV PDF generated: {OUTPUT_PDF}")
