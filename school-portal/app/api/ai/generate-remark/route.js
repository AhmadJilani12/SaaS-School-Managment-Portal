import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Check if API key exists
    if (!process.env.OPENAI_API_KEY) {
      console.error('Missing OPENAI_API_KEY environment variable');
      return NextResponse.json(
        { error: 'AI service not configured. Please set OPENAI_API_KEY in .env.local' },
        { status: 500 }
      );
    }

    // Parse request body
    const { student, teacherNotes = '' } = await req.json();

    if (!student) {
      return NextResponse.json(
        { error: 'Student data is required' },
        { status: 400 }
      );
    }

    // Build the prompt for ChatGPT
    const prompt = `You are an experienced school teacher writing brief, constructive student remarks. Write in 2-3 sentences, keep tone encouraging but honest, make it parent-friendly.

Student Information:
- Name: ${student.name || 'N/A'}
- Roll Number: ${student.rollNo || 'N/A'}
- Class: ${student.currentClass || 'N/A'}-${student.currentSection || 'N/A'}
- Mid Exam Score: ${student.midExam || 'N/A'}/100
- Final Exam Score: ${student.finalExam || 'N/A'}/100
- Percentage: ${student.percentage || 'N/A'}
- Grade: ${student.grade || 'N/A'}
- Current Status: ${student.status || 'N/A'}
- Previous Remark: ${student.remark || 'No previous remark'}
- Homework Status: ${student.homeWork || 'Regular'}
- Additional Teacher Notes: ${teacherNotes || 'None'}

Please generate a professional, encouraging remark that:
1. Acknowledges the student's performance
2. Highlights strengths or areas for improvement
3. Is suitable to share with parents
4. Motivates the student

Return only the remark text, nothing else.`;

    // Call OpenAI API
    const model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that writes professional teacher remarks for students. Keep responses concise (2-3 sentences), encouraging, and parent-friendly.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 150,
        temperature: 0.7,
        top_p: 0.9
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API Error:', errorData);
      
      if (response.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again in a few moments.' },
          { status: 429 }
        );
      }
      
      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Invalid or expired API key. Please check OPENAI_API_KEY.' },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { error: 'OpenAI service error', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Extract the remark from response
    const remark = data?.choices?.[0]?.message?.content?.trim() || '';

    if (!remark) {
      return NextResponse.json(
        { error: 'No remark generated' },
        { status: 500 }
      );
    }

    // Log successful generation (optional - for audit trail)
    console.log(`[AI Remark] Generated for student: ${student.name} at ${new Date().toISOString()}`);

    return NextResponse.json({
      success: true,
      remark: remark,
      timestamp: new Date().toISOString(),
      model: model,
      tokens: data?.usage || {}
    });

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: error.message 
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to check if AI service is available
export async function GET() {
  const isConfigured = !!process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';
  
  return NextResponse.json({
    status: isConfigured ? 'configured' : 'not_configured',
    model: model,
    message: isConfigured 
      ? 'AI service is ready' 
      : 'Please configure OPENAI_API_KEY in .env.local'
  });
}
