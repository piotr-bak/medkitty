import Image from "next/image";

export default function DashboardImg() {
    return (
        <div>
            <Image
                src={'/glyph.svg'}
                alt="An image of a dog"
                width={306}
                height={240}
            />
        </div>
    );
  }
