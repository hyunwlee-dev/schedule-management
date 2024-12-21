import { useEffect, useRef } from 'react';

/**
 * @description 여러 개의 ref를 하나로 합치고 싶을 때 사용할 수 있는 hook입니다. [insights: toss/slash]
 *
 * @example
 * ```
 * const Example = forwardRef<HTMLDivElement, Props>((props, parentRef) => {
 *   const myRef = useRef<HTMLDivElement>(null);
 *   const ref = useCombinedRefs(myRef, parentRef);
 *
 *   // 하단 div가 업데이트되면 "myRef"와 "parentRef" 모두가 업데이트 됩니다.
 *   return <div ref={ref} />;
 * });
 * ```
 *
 * @returns 결합된 ref를 반환합니다.
 */
export const useCombinedRefs = <T,>(...refs: (React.Ref<T> | null)[]) => {
  const targetRef = useRef<T>(null);

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
        return;
      }

      (ref as React.MutableRefObject<T | null>).current = targetRef.current;
    });
  }, [refs]);

  return targetRef;
};
