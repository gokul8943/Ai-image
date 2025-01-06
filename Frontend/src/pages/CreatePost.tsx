import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import FormField from '../components/FormField';
import Loader from '../components/Loader';


interface FormData {
  name: string;
  prompt: string;
  photo: string;
}

const CreatePost: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormData>({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = (): void => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async (): Promise<void> => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('https://dalle-arbb.onrender.com/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        if (!response.ok) throw new Error('Failed to generate image');

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Failed to generate image');
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide a proper prompt');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('https://dalle-arbb.onrender.com/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });

        if (!response.ok) throw new Error('Failed to share post');
        
        await response.json();
        alert('Successfully shared with the community!');
        navigate('/');
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Failed to share post');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center sm:text-left space-y-4">
          <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Create
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl max-w-2xl">
            Generate an imaginative image through DALL-E AI and share it with the community
          </p>
        </div>

        <form 
          className="mt-12 max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8"
          onSubmit={handleSubmit}
        >
          <div className="space-y-8">
            <FormField
              labelName="Your Name"
              type="text"
              name="name"
              placeholder="Ex., John Doe"
              value={form.name}
              handleChange={handleChange}
            />

            <FormField
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />

            <div className="relative aspect-square max-w-sm mx-auto">
              <div className="w-full h-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl overflow-hidden transition-all duration-300 hover:border-indigo-500">
                {form.photo ? (
                  <img
                    src={form.photo}
                    alt={form.prompt}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-full object-contain opacity-40 p-8"
                  />
                )}

                {generatingImg && (
                  <div className="absolute inset-0 z-10 flex justify-center items-center bg-black/50 rounded-xl backdrop-blur-sm">
                    <Loader />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={generateImage}
              className="w-full sm:w-auto px-6 py-3 text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              disabled={generatingImg || !form.prompt}
            >
              {generatingImg ? 'Generating...' : 'Generate Image'}
            </button>
          </div>

          <div className="mt-8 space-y-4">
            <p className="text-gray-500 text-sm">
              ** Once you have created the image you want, you can share it with others in the community **
            </p>
            <button
              type="submit"
              disabled={loading || !form.prompt || !form.photo}
              className="w-full px-6 py-3 text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Sharing...' : 'Share with the Community'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;