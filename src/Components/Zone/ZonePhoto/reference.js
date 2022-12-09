const IMAGES = [
    'https://images.unsplash.com/photo-1512776397924-7fe3eb1d842b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1536553355071-1f3749962cd5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1505567745926-ba89000d255a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1426170042593-200f250dfdaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1477768663691-75454fd8e870?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1496060169243-453fde45943b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1570451487809-6f9cbee2e0d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1485201543483-f06c8d2a8fb4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
    'https://images.unsplash.com/photo-1534406315430-4d7cf92bc690?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1518128958364-65859d70aa41?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=687&q=80',
    'https://images.unsplash.com/photo-1508669232496-137b159c1cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1455218873509-8097305ee378?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1545769743-16f354c6262b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80,',
    'https://images.unsplash.com/photo-1550236520-7050f3582da0?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
  ];
  
  const LOADING_EFFECTS = [
    'fade', 
    'grow',
    'slide',
  ];
  
  /**
  * App Component
  */
  
  class App extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        effect: 'fade',
      };
    }
    
    handleEffectSelect = (effect) => {
      this.setState({
        effect,
      });
    }
    
    itemRenderer = (item) => {
      return (
        <ImageCard
          key={item}
          src={item}
         /> 
      );   
    };
   
    render() {
      const { effect } = this.state;
      
      return (
        <React.Fragment>
          <AppHeader 
            title="Photo Gallery"
            subtitle="Loading Animations"
          >
            <Menu 
              className="app-menu"
              options={LOADING_EFFECTS}
              selected={effect}
              onSelect={this.handleEffectSelect}
            />
          </AppHeader>  
          <div className="app-content">
            <MansonryGrid
              key={effect}
              transition={effect}
              items={IMAGES}
              itemRenderer={this.itemRenderer}
              onLoaded={this.handleLoaded}
            /> 
          </div>  
        </React.Fragment> 
      );
    }
  }
  
  /**
  * AppHeader component
  */
  
  const AppHeader = ({
    title,
    subtitle,
    children,
  }) => (
    <div className="app-header">
      <h1 className="app-header-title">
        {title}
        {subtitle && (
          <span>
            {subtitle}
          </span>  
        )} 
      </h1> 
      {children}
    </div>  
  );
  
  AppHeader.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    children: PropTypes.node,
  };
  
  /**
  * Menu component
  */
  
  const Menu = ({
    className,
    options,
    selected,
    onSelect,
  }) => {
    const handleItemClick = (effect) => (
      () => onSelect(effect)
    );
   
    return (
      <ul className={classNames('menu', className)}>
        {options.map((option) => (
          <li 
            className={classNames('menu-item', {
              active: selected === option,
            })}
            onClick={handleItemClick(option)}
          >
            {option}
          </li> 
        ))}
      </ul>  
    );  
  };
  
  Menu.propTypes = {
    className: PropTypes.string,
    options: PropTypes.array,
    selected: PropTypes.string,
    onSelect: PropTypes.func,
  };
  
  Menu.defaultProps = {
    options: [],
    selected: null,
    onSelect: () => {},
  };
  
  /**
  * MansonryGrid component
  */
  
  class MansonryGrid extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        loaded: false,
      };    
    }
    
    handleLayoutComplete = () => {
      this.setState({
         loaded: true,
       });
    }
    
    componentDidMount() {    
      imagesLoaded('.masonry-grid', () => {
        this.masonry = new Masonry( '.masonry-grid', {
          initLayout: false,
          fitWidth: true,
          gutter: 32,
          itemSelector: '.masonry-grid-item',  
        });
            
        this.masonry.once('layoutComplete', this.handleLayoutComplete);   
        this.masonry.layout();
      });
    }
    
    render() {
      const { loaded } = this.state;
      const { 
        transition, 
        items, 
        itemRenderer, 
      } = this.props;
      
      return (
        <div className="masonry-grid">
          <Fade 
            in={!loaded}
            timeout={{
              enter: 300,
              exit: 300,
            }}
            mountOnEnter
            unmountOnExit
          >
            <Loader />
          </Fade>  
          {items.map((item, index) => (
            <TransitionEffect
              name={transition}
              in={loaded} 
              timeout={600} 
            >
              <div 
                className="masonry-grid-item"
                style={{
                  transitionDuration: `${600 + index * 80}ms`,
                  transitionDelay: `${index * 60}ms`,
                }}
               >
                {itemRenderer(item, index)}   
              </div>  
            </TransitionEffect>  
          ))}
        </div>  
      );   
    } 
  }
  
  MansonryGrid.propTypes = {
    transition: PropTypes.string,
    items: PropTypes.array,
    itemRenderer: PropTypes.func,
    onLoaded: PropTypes.func,
  };
  
  MansonryGrid.defaultProps = {
    transition: 'fade',
    items: [],
    itemRenderer: () => {},
    onLoaded: () => {},
  };
  
  /**
  * ImageCard Component
  */
  
  const ImageCard = ({
    className,
    src,
    alt,
    ...other
  }) => {
    return (
      <img 
        className={classNames('image-card', className)}
        src={src} 
        alt={alt} 
        {...other}
      /> 
    );
  };
  
  ImageCard.propTypes = { 
    src: PropTypes.string,
    alt: PropTypes.string,
  };
  
  ImageCard.defaultProps = {
    alt: '',
  };
  
  /**
  * Loader component
  */
  
  const Loader = () => (
    <div className="loader">
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  );
  
  /**
  * Fade Component
  */
  
  const Fade = ({
   children,
   ...other   
  }) => (
     <TransitionEffect
      name="fade"
      {...other}
     >
      {children}
    </TransitionEffect>  
  );
  
  Fade.propTypes = {
    children: PropTypes.element.isRequired,
  };
  
  /**
  * Grow Component
  */
  
  const Grow = ({
    children,
    ...other
  }) => (
    <TransitionEffect
      name="grow"
      {...other}
     >
      {children}
    </TransitionEffect>  
  );
  
  Grow.propTypes = {
    children: PropTypes.element.isRequired,
  };
  
  /**
  * TransitionEffect Component 
  */
  
  const TransitionEffect = ({
    name,
    children,
    ...other
  }) => (
    <ReactTransitionGroup.CSSTransition
      classNames={name}
      appear
      {...other} 
      > 
      {React.cloneElement(children, {
        className: classNames(children.props.className, name),
      })} 
    </ReactTransitionGroup.CSSTransition> 
  );
  
  TransitionEffect.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
  };
  
  ReactDOM.render(<App />, document.getElementById('app'));