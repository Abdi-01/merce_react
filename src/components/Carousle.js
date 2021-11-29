import React, { useState } from 'react';
import { Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem } from 'reactstrap';

function CarousleHome() {

    const [bannerList, setBannerList] = useState([
        {
            altText: 'Slide 1',
            caption: 'Slide 1',
            key: 1,
            src: 'https://picsum.photos/id/123/1200/600'
        },
        {
            altText: 'Slide 2',
            caption: 'Slide 2',
            key: 2,
            src: 'https://picsum.photos/id/456/1200/600'
        },
        {
            altText: 'Slide 3',
            caption: 'Slide 3',
            key: 3,
            src: 'https://picsum.photos/id/678/1200/600'
        }
    ])

    const [selectedIdx, setSelectedIdx] = useState(1)

    return (
        <Carousel
            activeIndex={selectedIdx}
            next={() => setSelectedIdx(selectedIdx == bannerList.length - 1 ? selectedIdx - (bannerList.length - 1) : selectedIdx + 1)}
            previous={() => setSelectedIdx(selectedIdx == 0 ? bannerList.length - 1 : selectedIdx - 1)}
        >
            <CarouselIndicators
                activeIndex={selectedIdx}
                items={bannerList}
            />
            {
                bannerList.map((value, index) => {
                    return <CarouselItem
                    >
                        <img
                            style={{ borderRadius: "10px" }}
                            alt={`img${index}`}
                            src={value.src}
                            width="100%"

                        />
                        <CarouselCaption
                            captionHeader={value.caption}
                            captionText={value.caption}
                        />
                    </CarouselItem>
                })
            }
            <CarouselControl
                direction="prev"
                directionText="Sebelum"
                onClickHandler={() => setSelectedIdx(selectedIdx == 0 ? bannerList.length - 1 : selectedIdx - 1)}
            />
            <CarouselControl
                direction="next"
                directionText="Sesudah"
                onClickHandler={() => () => setSelectedIdx(selectedIdx == bannerList.length - 1 ? selectedIdx - (bannerList.length - 1) : selectedIdx + 1)}
            />
        </Carousel>
    );
}

export default CarousleHome;