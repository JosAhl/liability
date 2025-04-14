import '@/styles/components/profile-card.css';
import { useState, useEffect, useRef } from 'react';

const ProfileCard = ({ profile }) => {
    // Sample tags array - in reality this would come from your database
    const allTags = ["Design", "UX", "UI", "Frontend", "React", "CSS", "NextJS"];
    const [visibleTags, setVisibleTags] = useState([]);
    const tagsContainerRef = useRef(null);
    const detailsRef = useRef(null);
    const ctaRef = useRef(null);

    useEffect(() => {
        const calculateVisibleTags = () => {
            if (!tagsContainerRef.current || !detailsRef.current || !ctaRef.current) return;
            
            const detailsWidth = detailsRef.current.offsetWidth;
            const ctaWidth = ctaRef.current.offsetWidth;
            const availableWidth = detailsWidth - ctaWidth - 16; // 16px for gap
            
            // Calculate average tag width (including gap)
            const tagWidth = 72; // Approximate width of a tag (56px) + gap (16px)
            
            // Calculate how many tags can fit
            const tagsToShow = Math.max(0, Math.floor(availableWidth / tagWidth));
            
            // Update visible tags
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
                <img src="" alt="" className='profile-img'/>
                <div className='profile-description'>
                    <h2 className='profile-heading'>Förnamn Efternamn</h2>
                    <p className='profile-p'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem tempora, corrupti non pariatur cum tempore ipsam ducimus perspiciatis doloremque ut aut ipsa veritatis enim nostrum. Cupiditate eligendi accusamus veritatis velit deserunt quos aperiam alias omnis explicabo soluta, id consequatur laudantium ut officiis. Quia facere necessitatibus ex harum consectetur quasi animi.</p>
                </div>
            </div>
            <div className="profile-details" ref={detailsRef}>
                <div className="tags-container" ref={tagsContainerRef}>
                    {visibleTags.map((tag, index) => (
                        <span key={index} className='tags'>{tag}</span>
                    ))}
                </div>
                <a href="" className='CTA' ref={ctaRef}>Öppna profil</a>
            </div>
        </div>
    );
}

export default ProfileCard;