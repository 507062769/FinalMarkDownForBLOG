// @ts-nocheck

import { useRef, useEffect, CSSProperties } from "react";

const HOCimgLazy = ({
  src,
  alt,
  title,
  style,
}: {
  src: string;
  alt?: string;
  title?: string;
  style?: CSSProperties;
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && imgRef.current) {
          // 图片进入视口，加载图片，因为有些图片还是很大，所以先加载一个loading效果，然后设置定时器，在1秒钟后再去请求真正的url地址
          imgRef.current.src =
            "https://i01piccdn.sogoucdn.com/87712d775905e2bb";
          setTimeout(() => {
            imgRef.current.src = src;
            observer.unobserve(imgRef.current);
          }, 1000);
        }
      });
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current); // 清理观察器
      }
    };
  }, [src]);

  return (
    <img ref={imgRef} alt={alt || ""} title={title || ""} style={style || {}} />
  );
};

export default HOCimgLazy;
