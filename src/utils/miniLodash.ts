// @ts-nocheck

// omit方法用于创建一个从对象中排除指定属性的新对象
export function omit(obj: any, props: any) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !props.includes(key))
  );
}

// throttle方法用于创建一个节流函数，该函数在指定时间内只能被调用一次
export function throttle(func: (props: any) => any, wait: number) {
  let timeout: any = null;
  let previous = 0;

  return function (...args: any) {
    const context = this;
    const now = Date.now();
    const remaining = wait - (now - previous);

    clearTimeout(timeout);

    if (remaining <= 0) {
      func.apply(context, args);
      previous = now;
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
        previous = Date.now();
      }, remaining);
    }
  };
}
