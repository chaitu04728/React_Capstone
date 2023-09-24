import Carousel from 'react-bootstrap/Carousel';

const homeData = [
  {
    id: 1,
    image: require('./images/img1.jpg'),
    title: 'The Perfect Design for Your Website',
    description: 'The Best Place to Shop',
    link: 'https://www.google.com',
  },
  {
    id: 2,
    image: require('./images/img2.jpg'),
    title: 'Start Your Shopping Journey',
    description: 'The Best Place to Shop',
    link: 'https://www.facebook.com',
  },
  {
    id: 3,
    image: require('./images/img3.png'),
    title: 'Enjoy the Shopping Experience',
    description: 'The Best Place to Shop',
    link: 'https://www.twitter.com',
  },
];

function Home() {
  return (
    <section id="home" className="home-block">
      <style>
        {`
          .carousel-item img {
            width: 100%;
            height: 670px;
            object-fit: cover;
          }
        `}
      </style>
      <Carousel>
        {homeData.map((home) => {
          return (
            <Carousel.Item key={home.id}>
              <img
                className="d-block w-100 img-fluid"
                src={home.image}
                alt={"Slide " + home.id}
              />
              <Carousel.Caption className="carousel-caption text-light bg-light rounded">
                <h2 className="text-dark">{home.title}</h2>
                <p className="text-dark">{home.description}</p>
                <a className="btn btn-primary btn-sm" href={home.link}>
                  Follow On <i className="fas fa-chevron-right"></i>
                </a>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </section>
  );
}

export default Home;
