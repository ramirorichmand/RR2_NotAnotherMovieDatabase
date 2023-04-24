import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Carousel from 'react-multi-carousel'
import { IMAGE_URL } from '../utils/Endpoints';
import avatar from '../assets/avatar.png'

const Cast = ({cast}) => {

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
      

  return (
    <div>
        <div className='max-w-[1200px] mx-auto px-5 mb-[2.5em]'>
            <div>
                <h2 className='uppercase text-white text-2xl ml-5 mb-8'>Top cast</h2>
            </div>
            <Carousel
            responsive={responsive}
                keyBoardControl={true}
                itemClass="carousel-item-padding-40-px"
                slidesToSlide={2}
            >
                {cast?.map((castMember) => (
                    <div key={crypto.randomUUID()}>
                        <div>
                            <LazyLoadImage className='rounded-full mx-auto w-[180px] h-[180px]' src={castMember.profile_path ? IMAGE_URL + castMember.profile_path : avatar} />
                        </div>
                        <div>
                            <h6 className='text-white text-center'>{castMember.name || castMember.original_name}</h6>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    </div>
  )
}

export default Cast