import type { ImageProps } from "next/image"
import Image from "next/image"

type Props = Omit<ImageProps, "src" | "alt">

export const DanielTranMark = (props: Props) => {
  return (
    <Image
      {...props}
      src="/images/logos/danieltran.png"
      alt="Daniel Tran"
      width={30}
      height={30}
    />
  )
}
