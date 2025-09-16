'use client';

import { type RefObject, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload, X, Loader2 } from 'lucide-react';

interface AnalysisFormProps {
  formRef: RefObject<HTMLFormElement>;
  action: (formData: FormData) => void;
  isPending: boolean;
}

export function AnalysisForm({ formRef, action, isPending }: AnalysisFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleRemoveImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  useEffect(() => {
    if (!isPending) {
        handleRemoveImage();
    }
  }, [isPending]);

  return (
    <Card>
      <form ref={formRef} action={action}>
        <CardHeader>
          <CardTitle>Submit Content</CardTitle>
          <CardDescription>Enter text and/or upload an image for analysis.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text">Text Content</Label>
            <Textarea
              id="text"
              name="text"
              placeholder="Paste the text you want to analyze here..."
              rows={8}
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image Content</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              disabled={isPending}
            />
            <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isPending}
                className="w-full"
            >
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
            </Button>
            {imagePreview && (
              <div className="relative mt-2 rounded-md overflow-hidden border">
                <Image
                  src={imagePreview}
                  alt="Image preview"
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6"
                  onClick={handleRemoveImage}
                  disabled={isPending}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove image</span>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isPending ? 'Analyzing...' : 'Analyze'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
