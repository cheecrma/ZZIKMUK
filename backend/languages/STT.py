from .key import service
from google.cloud import speech


def speech_to_text(audio_path):

    client = speech.SpeechClient()

    with open(audio_path, "rb") as audio_file:
        content = audio_file.read()

    audio = speech.RecognitionAudio(content=content)

    speech_context = speech.SpeechContext(phrases=[
            '다음',
            '이전',
            '다시', '한번 더',
            '넘겨', '이동'
            '읽어', '재생'
        ])

    sample_speech_contexts = [
            '다음',
            '이전',
            '다시', '한번 더',
            '넘겨', '이동'
            '읽어', '재생'
        ]

    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.WEBM_OPUS,
        sample_rate_hertz=16000,
        language_code="ko-KR",
        speech_contexts=[speech_context],
    )

    # operation = client.long_running_recognize(config=config, audio=audio)

    print("Waiting for operation to complete...")

    # response = operation.result(timeout=90)
    response = operation.recognize(config=config, audio=audio)

    print(response)

    try:
        for result in response.results:
            result_text = result.alternatives[0].transcript
            print(result_text)

            for context in sample_speech_contexts:
                if context in result_text:
                    if context == '다음':
                        return 3
                    elif context == '이전':
                        return 1
                    elif context in ['다시', '한번 더']:
                        return 2

            return -1

    except:
        return 'failed'