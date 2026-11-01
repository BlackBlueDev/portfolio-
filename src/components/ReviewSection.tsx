import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Star, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const ReviewSection: React.FC = () => {
  const { data, addReview } = usePortfolio();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addReview({
      name: name.trim() || 'Visitante',
      rating,
      comment: comment.trim()
    });

    setSubmitted(true);
    setName('');
    setComment('');
    setRating(5);
    setTimeout(() => setSubmitted(false), 4000);
  };

  // Calculate average rating safely
  const reviews = Array.isArray(data?.reviews) ? data.reviews : [];
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + (r?.rating || 5), 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <div className="mt-12 pt-8 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-4xl mx-auto">
        
        {/* Header - Compact */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-500 flex items-center justify-center">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <span>Avaliações & Recomendações</span>
                {reviews.length > 0 ? (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
                    ★ {avgRating} ({reviews.length})
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                    Aberto para avaliações
                  </span>
                )}
              </h4>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Deixe seu feedback sobre os serviços ou parcerias realizadas com Mickael.
              </p>
            </div>
          </div>
        </div>

        {/* Small Review Input Form */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#13161c] border border-neutral-200 dark:border-neutral-800 shadow-2xs mb-6">
          {submitted ? (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 py-2 justify-center">
              <CheckCircle2 className="w-4 h-4" />
              <span>Obrigado pela sua avaliação! Seu comentário foi registrado e publicado.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* 5 Stars Selector */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mr-1">
                    Nota:
                  </span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-0.5 focus:outline-none transition-transform hover:scale-125 cursor-pointer"
                      aria-label={`${star} estrelas`}
                    >
                      <Star
                        className={`w-4 h-4 transition-colors ${
                          (hoverRating || rating) >= star
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-neutral-300 dark:text-neutral-700'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 ml-1">
                    {rating}/5
                  </span>
                </div>

                {/* Name Input */}
                <input
                  type="text"
                  placeholder="Seu Nome ou Empresa (opcional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-brand-lime sm:w-64"
                />
              </div>

              {/* Comment text & Submit */}
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="Deixe um breve comentário ou depoimento..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-brand-lime"
                />

                <button
                  type="submit"
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-neutral-900 dark:bg-brand-lime text-white dark:text-black text-xs font-bold hover:opacity-90 transition-opacity shrink-0 shadow-2xs cursor-pointer"
                >
                  <span>Avaliar</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Reviews List or Empty State */}
        {reviews.length === 0 ? (
          <div className="p-6 rounded-2xl bg-neutral-50/60 dark:bg-[#13161c]/60 border border-dashed border-neutral-200 dark:border-neutral-800 text-center">
            <MessageSquare className="w-6 h-6 mx-auto text-neutral-400 dark:text-neutral-500 mb-2 opacity-60" />
            <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              Nenhuma avaliação ainda
            </p>
            <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-0.5">
              Espaço reservado para clientes e parceiros reais. Seja o primeiro a avaliar no formulário acima!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-3.5 rounded-xl bg-neutral-50/80 dark:bg-[#141820] border border-neutral-200/70 dark:border-neutral-800/80 flex flex-col justify-between text-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="font-bold text-neutral-800 dark:text-neutral-200 truncate">
                      {rev.name}
                    </span>
                    <div className="flex items-center text-amber-400 shrink-0">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 text-[11px] leading-relaxed line-clamp-3">
                    "{rev.comment}"
                  </p>
                </div>
                <span className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-2 block">
                  {rev.date}
                </span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
