export interface DialTarget {
    target?: string | ( () => void );
}

interface DialAction extends DialTarget {
    icon: JSX.Element;
    name: string;
}

export interface DialProps {
    actions: DialAction[];
    openIcon: JSX.Element;
}
