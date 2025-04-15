import '@/styles/components/profile-card.css';
import { useState, useEffect, useRef } from 'react';

const ProfileCard = ({ profile }) => {
    // Mock data for demonstration
    const allTags = ["Design", "UX", "UI", "Frontend", "React", "CSS", "NextJS"];
    const [visibleTags, setVisibleTags] = useState([]);
    const tagsContainerRef = useRef(null);

    useEffect(() => {
        const calculateVisibleTags = () => {
            if (!tagsContainerRef.current) return;
            
            const containerWidth = tagsContainerRef.current.offsetWidth;
            
            // Calculate average tag width (including gap)
            const tagWidth = 72; // More realistic value for tag width + gap
            
            // Calculate how many tags can fit
            const tagsToShow = Math.max(1, Math.floor(containerWidth / tagWidth));
            
            // Update visible tags - ensure at least one tag shows
            setVisibleTags(allTags.slice(0, tagsToShow));
        };
        
        // Calculate on mount and on window resize
        calculateVisibleTags();
        window.addEventListener('resize', calculateVisibleTags);
        
        return () => {
            window.removeEventListener('resize', calculateVisibleTags);
        };
    }, []);

    return (
        <div className="profile-card">
            <div className="profile-info">
                <div className='profile-img-container'>
                    <img className='profile-img' src="" alt=""/>
                    <a className='favourite'>
                        <img src="icon/heart.png" alt="" />
                        <p className='favourite-save'>Spara</p>
                    </a>
                </div>
                <div className='profile-description'>
                    <h2 className='profile-heading'>Förnamn Efternamn</h2>
                    <p className='profile-p'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem tempora, corrupti non pariatur cum tempore ipsam ducimus perspiciatis doloremque ut aut ipsa veritatis enim nostrum. Cupiditate eligendi accusamus veritatis velit deserunt quos aperiam alias omnis explicabo soluta, id consequatur laudantium ut officiis. Quia facere necessitatibus ex harum consectetur quasi animi.</p>
                </div>
            </div>
            <div className="tags-container" ref={tagsContainerRef}>
                {visibleTags.map((tag, index) => (
                    <span key={index} className='tags'>{tag}</span>
                ))}
            </div>
            <div className='profile-contact-details'>
                <div className='profile-contact'>
                    <p>Kontaktuppgifter:</p>
                    <div className='profile-social-media'>
                        <a href=""><img src="icon/EnvelopeSimple.png" alt="" /></a>
                        <a href=""><img src="icon/LinkedinLogo.png" alt="" /></a>
                    </div>
                </div>
                <a href="" className='CTA'>Öppna profil</a>
            </div>
        </div>
    );
}

export default ProfileCard;