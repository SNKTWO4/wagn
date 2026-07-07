from pathlib import Path
import re
import xml.etree.ElementTree as ET

slides = Path(r"D:\html\_asset_extract\portfolio\ppt\slides")
text_tag = "{http://schemas.openxmlformats.org/drawingml/2006/main}t"


def slide_number(path: Path) -> int:
    match = re.search(r"\d+", path.stem)
    return int(match.group()) if match else 0


for slide in sorted(slides.glob("slide*.xml"), key=slide_number):
    root = ET.parse(slide).getroot()
    texts = [node.text.strip() for node in root.iter(text_tag) if node.text and node.text.strip()]
    if texts:
        print(f"--- {slide.name} ---")
        print(" | ".join(texts))
