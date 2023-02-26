import { render, RenderOptions } from '@builder.io/qwik';
import Root from './entry.root';

export default function (opts: RenderOptions) {
  return render(document, <Root />, opts);
}
