'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import CheckboxButtons from '@/components/CheckboxButtons';

export default function StudentSoftwarePreferencesPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    software: [],
    extraSoftware: '',
  });

  // Load previous form data
  useEffect(() => {
    const savedData = localStorage.getItem('studentFormData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(prev => ({
        ...prev,
        ...parsedData
      }));
      console.log('Previous data loaded');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    
    if (checked) {
      setFormData(prev => ({
        ...prev,
        [name]: [...prev[name], value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: prev[name].filter(item => item !== value)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Merge with previous data and save
    const previousData = JSON.parse(localStorage.getItem('studentFormData') || '{}');
    const updatedData = { ...previousData, ...formData };
    localStorage.setItem('studentFormData', JSON.stringify(updatedData));
    
    // Navigate to next step
    router.push('/register/success'); /* ----------------------------------------- lägg till nästa steg */
  };

  // Design software options
  const software = ['Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator'];

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <h5>Program (Välj minst 1)</h5>
          <CheckboxButtons
            options={software}
            name="designSoftware"
            selectedValues={formData.software}
            onChange={handleCheckboxChange}
            className="mt-2"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="extraSoftware">Lägg till annat program</label>
          <textarea
            id="extraSoftware"
            name="extraSoftware"
            value={formData.extraSoftware}
            placeholder="Annat"
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border rounded-md"
          />
        </div>
        
        <div className="form-navigation">
          <Button 
            text="<-" 
            className="primary" 
            variant="default" 
            color="blue"
            href="/register/student/personal-info"
          />
          <Button 
            text="Fortsätt" 
            className="primary" 
            variant="default" 
            color="red" 
            withArrow={true}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}