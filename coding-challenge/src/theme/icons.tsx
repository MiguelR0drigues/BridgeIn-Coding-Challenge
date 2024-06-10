export const HomeIcon = (
  props: React.HTMLAttributes<HTMLElement>
): JSX.Element => {
  return (
    <span {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        viewBox="0 0 48 48"
        fill="white"
      >
        <path d="M39.5,43h-9c-1.381,0-2.5-1.119-2.5-2.5v-9c0-1.105-0.895-2-2-2h-4c-1.105,0-2,0.895-2,2v9c0,1.381-1.119,2.5-2.5,2.5h-9 C7.119,43,6,41.881,6,40.5V21.413c0-2.299,1.054-4.471,2.859-5.893L23.071,4.321c0.545-0.428,1.313-0.428,1.857,0L39.142,15.52 C40.947,16.942,42,19.113,42,21.411V40.5C42,41.881,40.881,43,39.5,43z"></path>
      </svg>
    </span>
  );
};

export const UserIcon = (props: React.HTMLAttributes<HTMLElement>) => {
  return (
    <span {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        width={20}
        height={20}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7 6C7 3.23858 9.23858 1 12 1C14.7614 1 17 3.23858 17 6C17 8.76142 14.7614 11 12 11C9.23858 11 7 8.76142 7 6ZM12 3C10.3431 3 9 4.34315 9 6C9 7.65685 10.3431 9 12 9C13.6569 9 15 7.65685 15 6C15 4.34315 13.6569 3 12 3Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 22C2 16.4772 6.47715 12 12 12C17.5228 12 22 16.4772 22 22V23H2V22ZM4.06189 21H19.9381C19.446 17.0537 16.0796 14 12 14C7.92038 14 4.55399 17.0537 4.06189 21Z"
          fill="white"
        />
      </svg>
    </span>
  );
};

export const LeftArrowIcon = (props: React.HTMLAttributes<HTMLElement>) => {
  return (
    <span {...props}>
      <svg height="20" width="20" viewBox="0 0 45 34" fill="white">
        <polygon points="19.626,31.705 7.712,20 45,20 45,15 7.712,15 19.626,3.006 16.798,0.273 -0.38,17.499 16.798,34.605 " />
      </svg>
    </span>
  );
};

export const CommentIcon = (props: React.HTMLAttributes<HTMLElement>) => {
  return (
    <span {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="svg-icon"
        style={{
          width: "1em",
          height: "1em",
          verticalAlign: "middle",
          fill: "#fff",
          overflow: "hidden",
        }}
        viewBox="0 0 1024 1024"
        version="1.1"
      >
        <path d="M511.999488 847.882863c-28.734592 0-56.729303-2.604314-83.969807-7.099698L231.232673 960.185602 231.232673 761.40735C128.618486 689.355337 62.772174 578.889433 62.772174 454.825836c0-217.07906 201.129864-393.058051 449.228338-393.058051 248.084146 0 449.228338 175.980014 449.228338 393.058051C961.227826 671.917176 760.083635 847.882863 511.999488 847.882863zM511.999488 117.91762c-217.086932 0-393.074156 150.851707-393.074156 336.907193 0 114.166179 66.421434 214.898395 167.761552 275.820929l-1.768346 130.234133 132.171551-79.455633c30.4487 6.497994 62.117231 10.308787 94.910422 10.308787 217.101258 0 393.073132-150.825101 393.073132-336.907193C905.073644 268.769326 729.10177 117.91762 511.999488 117.91762zM736.614169 510.976694c-31.011542 0-56.154182-25.128307-56.154182-56.150858 0-31.010271 25.14264-56.151881 56.154182-56.151881s56.154182 25.14161 56.154182 56.151881C792.768351 485.848387 767.624687 510.976694 736.614169 510.976694zM511.999488 510.976694c-31.010518 0-56.153158-25.128307-56.153158-56.150858 0-31.010271 25.14264-56.151881 56.153158-56.151881 31.011542 0 56.154182 25.14161 56.154182 56.151881C568.15367 485.848387 543.01103 510.976694 511.999488 510.976694zM287.385831 510.976694c-31.010518 0-56.153158-25.128307-56.153158-56.150858 0-31.010271 25.14264-56.151881 56.153158-56.151881s56.153158 25.14161 56.153158 56.151881C343.53899 485.848387 318.39635 510.976694 287.385831 510.976694z" />
      </svg>
    </span>
  );
};
