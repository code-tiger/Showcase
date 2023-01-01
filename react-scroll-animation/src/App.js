/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";

const exampleItems = [
  {
    title: "Section 1",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Section 2",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Section 3",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

function App() {
  const refs = useRef([]);

  // create intersaction observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          entry.target.classList.remove("hidden");
        } else {
          entry.target.classList.remove("show");
          entry.target.classList.add("hidden");
        }
      });
    },
    {
      rootMargin: "-100px 0px",
    }
  );

  useEffect(() => {
    refs.current = refs.current.slice(0, exampleItems.length);
  }, [exampleItems]);

  useEffect(() => {
    // observe each ref
    refs.current?.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      // unobserve each ref
      refs.current?.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [refs]);

  return (
    <div className="app">
      {exampleItems.map((item, index) => (
        <FullHeightSection
          ref={(element) => (refs.current[index] = element)}
          key={index}
        >
          <h1>{item.title}</h1>
          <p>{item.content}</p>
        </FullHeightSection>
      ))}
    </div>
  );
}

const FullHeightSection = React.forwardRef(function (
  props: {
    children: React.ReactNode,
  },
  ref: React.Ref<HTMLDivElement>
) {
  const { children } = props;

  return (
    <section ref={ref} className="full-height-section">
      {children}
    </section>
  );
});

export default App;
