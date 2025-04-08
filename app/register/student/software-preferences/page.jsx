'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import CheckboxButtons from '@/components/CheckboxButtons';
import FormInput from '@/components/FormInput';

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
    <div className="wrapper">
      <div className="image-container">
      <img src="/form-step-2.svg" alt="Progress bar step 1/6" />
    </div>
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
          <FormInput
          type="textarea"
          label="Lägg till annat program"
          name="extraSoftware"
          id="extraSoftware"
          placeholder="Annat"
          value={formData.extraSoftware}
          onChange={handleChange}
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
    </div>
  );
}