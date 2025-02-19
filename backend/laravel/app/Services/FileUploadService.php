<?php

namespace App\Services;

use Cloudinary\Cloudinary;
use Cloudinary\Api\Upload\UploadApi;
use Illuminate\Http\UploadedFile;

class FileUploadService
{
    protected $cloudinary;

    public function __construct()
    {
        // Initialize Cloudinary using the CLOUDINARY_URL from .env
        $this->cloudinary = new Cloudinary(env('CLOUDINARY_URL'));
    }

    public function uploadFile(UploadedFile $file, string $folder = null): string
    {
        if (!$file->isValid()) {
            throw new \Exception('Invalid file upload');
        }

        // Determine resource type based on file mimetype
        $mimeType = $file->getMimeType();
        $resourceType = 'raw'; // Default to raw

        if (str_starts_with($mimeType, 'image/')) {
            $resourceType = 'image';
        } elseif (str_starts_with($mimeType, 'video/')) {
            $resourceType = 'video';
        } elseif (str_starts_with($mimeType, 'audio/')) {
            $resourceType = 'video'; // Cloudinary handles audio under 'video'
        } elseif (in_array($mimeType, [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ])) {
            $resourceType = 'raw'; // Explicitly keep documents as raw
        }

        // Append the provided folder to "uploads/"
        $baseFolder = env('CLOUDINARY_FOLDER', 'uploads'); // Default base folder
        $uploadFolder = $folder ? "{$baseFolder}/{$folder}" : $baseFolder; // Append if folder exists

        // Upload file to Cloudinary
        $upload = $this->cloudinary->uploadApi()->upload(
            $file->getRealPath(),
            [
                'folder' => $uploadFolder,
                'resource_type' => $resourceType
            ]
        );


        return $upload['secure_url']; // Return Cloudinary URL
    }
}
