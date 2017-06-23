export declare const reqAnimFrame: any;
export declare const easeInOutCubic: (t: number, b: number, c: number, d: number) => number;
export declare function getDefaultTarget(): Window | null;
export declare function getOffsetTop(element: HTMLElement): number;
export declare type Section = {
    top: number;
    bottom: number;
    section: any;
};
export declare function scrollTo(href: string, offsetTop?: number, target?: typeof getDefaultTarget, callback?: () => void): void;
declare class AnchorHelper {
    private links;
    private currentAnchor;
    private _activeAnchor;
    constructor();
    addLink(link: string): void;
    getCurrentActiveAnchor(): HTMLAnchorElement | null;
    setActiveAnchor(component: HTMLAnchorElement): void;
    getCurrentAnchor(offsetTop?: number, bounds?: number): any;
    scrollTo(href: string, offsetTop: number | undefined, target?: typeof getDefaultTarget, callback?: () => void): void;
}
export default AnchorHelper;
