# MVP architecture

`Dashboard → Express API → weather / terrain / historical adapters → risk engine → alerts + safe zones + route`.

The risk engine remains deterministic for the demo. A Hugging Face probability can be supplied as an input signal when the hosted model is ready; otherwise the API uses a transparent heuristic from rain, terrain slope, elevation, and historical flood likelihood.
