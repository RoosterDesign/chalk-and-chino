declare module '*.jpg' {
    const value: import('next/image').StaticImageData;
    export default value;
}

declare module '*.png' {
    const value: import('next/image').StaticImageData;
    export default value;
}

declare module '*.jpeg' {
    const value: import('next/image').StaticImageData;
    export default value;
}

declare module '*.svg' {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}
