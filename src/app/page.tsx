'use client';

// import transcribe from '@/actions/transcribe';
import getSignUploadRequest from '@/actions/upload';
import { Group, Text } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import '@mantine/dropzone/styles.css';
import { IconRadio, IconUpload, IconX } from '@tabler/icons-react';
import { useState, useTransition } from 'react';

const MAX_SIZE = 100 * 1024 ** 2; // 100mb

export default function Home() {
  // const [, formAction, isPending] = useActionState(transcribe, null);
  const [rejectingReason, setRejectingReason] = useState<string[]>([]);

  const [isPending, startTransition] = useTransition();

  return (
    <Dropzone
      onDrop={(files) => {
        startTransition(async () => {
          console.log('start...');
          const formData = new FormData();
          formData.append('filename', files[0].name);
          console.log('get signature');
          const params = await getSignUploadRequest(formData);

          const paramsEntries = Object.entries(params);

          const uploadFormData = new FormData();
          paramsEntries.forEach(([key, value]) => {
            uploadFormData.append(key, value);
          });
          uploadFormData.append('file', files[0]);
          uploadFormData.append(
            'api_key',
            process.env.NEXT_PUBLIC_CLOUDINARY_KEY!
          );

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const uploaded = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/video/upload`,
            { method: 'POST', body: uploadFormData }
          );

          // const { url } = await uploaded.json();
        });
      }}
      onReject={(files) => {
        setRejectingReason(
          files.flatMap(({ errors }) => errors.map((error) => error.message))
        );
      }}
      maxSize={MAX_SIZE}
      multiple={false}
      maxFiles={1}
      loading={isPending}
      accept={['audio/mpeg']}
    >
      <Group
        justify="center"
        gap="l"
        mih={220}
        style={{ pointerEvents: 'none' }}
      >
        <Dropzone.Accept>
          <IconUpload
            size={52}
            color="var(--mantine-color-blue-6)"
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <Group>
            <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
            <div>{rejectingReason}</div>
          </Group>
        </Dropzone.Reject>
        <Dropzone.Idle>
          <Group>
            <IconRadio
              size={60}
              color="var(--mantine-color-dimmed)"
              stroke={1.5}
            />
            <div>
              <Text size="xl" inline>
                Przeciągnij swoje nagranie audycji
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                Jeden plik mp3. Maksymalnie godzina nagrania albo poniżej 25MB.
              </Text>
            </div>
          </Group>
        </Dropzone.Idle>
      </Group>
    </Dropzone>
  );
}
