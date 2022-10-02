from .key import service
from google.cloud import speech


def speech_to_text(audio_path):

    client = speech.SpeechClient()

    with open(audio_path, "rb") as audio_file:
        content = audio_file.read()

    print(content)

    audio = speech.RecognitionAudio(content=content)

    print(audio)

    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.WEBM_OPUS,
        sample_rate_hertz=16000,
        language_code="ko-KR",
    )

    operation = client.long_running_recognize(config=config, audio=audio)

    print("Waiting for operation to complete...")
    response = operation.result(timeout=90)

    for result in response.results:
        print(u"Transcript: {}".format(result.alternatives[0].transcript))
        print("Confidence: {}".format(result.alternatives[0].confidence))

    if len(response.results) >= 2:
        return response.results.alternatives[0].transcript
    else:
        return 'failed'